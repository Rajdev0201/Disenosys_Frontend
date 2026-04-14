import ExamAuth from "@/screens/exam/Auth";

export const metadata = () => {
  return {
    title: "Quiz Login",
  };
};

export default function ExamPage() {
  return (
    <main>
      <ExamAuth />
    </main>
  );
}
