import { useCallback, useEffect, useRef } from "react";
import { API } from "@/components/utils/constant";

export const prerecordEndpoints = {
  fetchCourse: (courseName) =>
    `${API}record-course?courseName=${encodeURIComponent(courseName)}`,
  fetchProgress: (courseName) =>
    `${API}course-completed?courseName=${encodeURIComponent(courseName)}`,
  saveProgress: () => `${API}save-progress`,
};

export function safeDecodeSlug(slug) {
  if (!slug) return "";
  const raw = Array.isArray(slug) ? slug.join("/") : slug;
  let value = String(raw);
  // Handle cases where the slug is encoded once or multiple times.
  // Example: "CATIA%2520Foundations" -> "CATIA Foundations"
  for (let i = 0; i < 3; i += 1) {
    try {
      const decoded = decodeURIComponent(value);
      if (decoded === value) break;
      value = decoded;
    } catch {
      break;
    }
  }
  return value;
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function formatDuration(seconds) {
  const s = Math.max(0, Number(seconds) || 0);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function isYouTube(url) {
  const u = String(url || "");
  return u.includes("youtube.com") || u.includes("youtu.be");
}

export function toYouTubeEmbed(url) {
  const u = String(url || "");
  if (!u) return "";
  try {
    if (u.includes("youtube.com/watch")) {
      const q = new URL(u);
      const id = q.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : u;
    }
    if (u.includes("youtu.be/")) {
      const id = u.split("youtu.be/")[1]?.split("?")[0]?.split("#")[0];
      return id ? `https://www.youtube.com/embed/${id}` : u;
    }
    return u;
  } catch {
    return u;
  }
}

export function normalizeLectures(courseDoc) {
  const splitList = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
    return String(value)
      .split(/[\n,]+/g)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const splitLinks = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
    return String(value)
      .split(/[\n,]+/g)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const parseDurationToSec = (value) => {
    const v = String(value || "").trim();
    if (!v) return 0;
    // supports "mm:ss", "m.ss" (common from your DB), or minutes as number.
    if (v.includes(":")) {
      const [mm, ss] = v.split(":");
      const m = Number(mm);
      const s = Number(ss);
      if (Number.isFinite(m) && Number.isFinite(s)) return Math.max(0, m * 60 + s);
    }
    if (v.includes(".")) {
      const [mStr, sStr] = v.split(".");
      const m = Number(mStr);
      const s = Number(sStr);
      if (Number.isFinite(m) && Number.isFinite(s) && sStr.length <= 2) {
        return Math.max(0, m * 60 + s);
      }
      const minutes = Number(v);
      if (Number.isFinite(minutes)) return Math.max(0, Math.round(minutes * 60));
    }
    const minutes = Number(v);
    if (Number.isFinite(minutes)) return Math.max(0, Math.round(minutes * 60));
    return 0;
  };

  // Your DB shape: `Curriculum: [{ titles, title, subTopic, subLinks, duration, subTopics, _id }, ...]`
  const curriculumRaw =
    courseDoc?.Curriculum ||
    courseDoc?.curriculum ||
    courseDoc?.Curriculam ||
    courseDoc?.curriculam ||
    null;
  if (Array.isArray(curriculumRaw) && curriculumRaw.length) {
    const sections = curriculumRaw.map((module, moduleIndex) => {
      const sectionTitle =
        module?.titles || module?.title || `Module ${moduleIndex + 1}`;
      const lessonTitles = splitList(module?.subTopic || module?.subTopics);
      const lessonLinks = splitLinks(module?.subLinks);
      const lessonDurations = splitList(module?.duration);
      const maxLen = Math.max(
        lessonTitles.length,
        lessonLinks.length,
        lessonDurations.length,
        0
      );

      const lectures = Array.from({ length: maxLen }).map((_, idx) => {
        const url = lessonLinks[idx] || "";
        const stableId = String(`${module?._id || sectionTitle}:${idx + 1}`);
        const legacyIds = [
          url ? `${module?._id || sectionTitle}:${idx + 1}:${url}` : "",
          `${module?._id || sectionTitle}:${idx + 1}:${module?._id || sectionTitle}-${idx + 1}`,
        ].filter(Boolean);
        const completionKey = String(url || stableId);
        return {
          id: stableId,
          legacyIds,
          completionKey,
          title: String(lessonTitles[idx] || `Lesson ${idx + 1}`),
          url: String(url),
          durationSec: parseDurationToSec(lessonDurations[idx]),
          resources: [],
          quiz: null,
          summary: String(module?.subTopics || ""),
          sectionTitle: String(sectionTitle),
        };
      });

      return {
        id: String(module?._id || sectionTitle),
        title: String(sectionTitle),
        lectures,
      };
    });

    const flat = sections.flatMap((s) => s.lectures);
    return { sections, flat };
  }

  const rawSections =
    courseDoc?.sections ||
    courseDoc?.curriculum ||
    courseDoc?.modules ||
    courseDoc?.content ||
    null;

  const asLecture = (raw, index, sectionTitle) => {
    const id =
      raw?._id ||
      raw?.lectureId ||
      raw?.id ||
      raw?.slug ||
      `${sectionTitle || "lecture"}-${index + 1}`;
    const title =
      raw?.title ||
      raw?.name ||
      raw?.lectureTitle ||
      raw?.videoTitle ||
      `Lecture ${index + 1}`;
    const url = raw?.videoUrl || raw?.url || raw?.video || raw?.videoPath || "";
    const durationSec =
      Number(raw?.durationSec ?? raw?.duration ?? raw?.lengthSec ?? 0) || 0;
    const resources = Array.isArray(raw?.resources) ? raw.resources : [];
    const quiz = raw?.quiz || raw?.questions || null;
    const summary = raw?.summary || raw?.description || "";
    return {
      id: String(id),
      title: String(title),
      url: String(url || ""),
      durationSec,
      resources,
      quiz,
      summary,
      sectionTitle: sectionTitle || "",
    };
  };

  if (Array.isArray(rawSections) && rawSections.length) {
    const sections = rawSections.map((section, sectionIndex) => {
      const sectionTitle =
        section?.title ||
        section?.name ||
        section?.sectionTitle ||
        `Section ${sectionIndex + 1}`;
      const lectureList =
        section?.lectures ||
        section?.lessons ||
        section?.videos ||
        section?.items ||
        [];
      const lectures = Array.isArray(lectureList)
        ? lectureList.map((l, idx) => asLecture(l, idx, sectionTitle))
        : [];
      return {
        id: String(section?._id || section?.id || sectionTitle),
        title: String(sectionTitle),
        lectures,
      };
    });

    const flat = sections.flatMap((s) => s.lectures);
    return { sections, flat };
  }

  const rawLectureArray =
    courseDoc?.lectures ||
    courseDoc?.lessons ||
    courseDoc?.videos ||
    courseDoc?.recordedVideos ||
    courseDoc?.recordings ||
    [];
  const lectures = Array.isArray(rawLectureArray)
    ? rawLectureArray.map((l, idx) => asLecture(l, idx, "Course content"))
    : [];

  return {
    sections: [{ id: "course-content", title: "Course content", lectures }],
    flat: lectures,
  };
}

export function useDebouncedFn(fn, waitMs) {
  const fnRef = useRef(fn);
  const timerRef = useRef(null);
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  return useCallback(
    (...args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => fnRef.current(...args), waitMs);
    },
    [waitMs]
  );
}
