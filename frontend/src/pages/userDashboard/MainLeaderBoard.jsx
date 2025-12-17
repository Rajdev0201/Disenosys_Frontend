import React from 'react'
import UserList from './LeaderBoardList'

const MainLeaderBoard = () => {
  return (
        <section>
        <div className="px-4 lg:px-12 font-dm-sans h-screen">
        {/* Heading */}
        <h1 className="font-medium text-lg lg:text-2xl text-[#333333] mb-2 mt-4">
          Leader Board
        </h1>
        <p className="font-medium text-xs lg:text-sm text-[#808080] mb-6">
          View top 5 performers and their scores at GPDX exam.
        </p>

        <UserList bar="yes" list="5"/>
      </div>
    </section>
  )
}

export default MainLeaderBoard