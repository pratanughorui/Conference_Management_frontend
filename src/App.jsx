import { useState } from 'react'

import AuthorRegistration from './components/AuthorRegistration'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ConferenceCreation from './components/ConferenceCreation'
import TrackCreation from './components/TrackCreation'
import CommitteeMembersRegistration from './components/CommitteeMembersRegistration'
import PaperAllotments from './components/PaperAllotments'
import EmailFormation from './components/EmailFormation'
import ReviewPaper from './components/ReviewPaper'
import ReviewerInformationTable from './components/ReviewerInformationTable'
import MembersInfo from './components/MembersInfo'
import AuthorReport from './components/AuthorReport'
import AuthorReport2 from './components/AuthorReport2'
function App() {
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/author-registration' element={<AuthorRegistration/>}></Route>
      <Route path='/conference-creation' element={<ConferenceCreation/>}></Route>
      <Route path='/track-creation' element={<TrackCreation/>}></Route>
      <Route path='/committee-members-registration' element={<CommitteeMembersRegistration/>}></Route>
      <Route path='/paper-review' element={<PaperAllotments/>}></Route>
      <Route path='/email-formation' element={<EmailFormation/>}></Route>
      <Route path='/review-paper' element={<ReviewPaper/>}></Route>
      <Route path='/reviewer-info' element={<ReviewerInformationTable/>} ></Route>
      <Route path='/member-info' element={<MembersInfo/>} ></Route>
      <Route path='/author-report' element={<AuthorReport/>} ></Route>
      <Route path='/paper-report' element={<AuthorReport2/>} ></Route>
   
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
