import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import Admin_Layout from './Admin_Layout.jsx'
import AuthorRegistration from './components/AuthorRegistration'
import ConferenceCreation from './components/ConferenceCreation'
import TrackCreation from './components/TrackCreation'
import CommitteeMembersRegistration from './components/CommitteeMembersRegistration'
import PaperAllotments from './components/PaperAllotments'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {listConferenceBtwDate,getAllConference,getConferencefromsession,getConferenceById,getallpaperandtrackbyconid,getallpaperandconauthorbyconid,getallmembersoftpcbyconid} from './Services/ConferenceServices'
import ReviewersRegistration from './components/ReviewersRegistration.jsx'
import Conference_Root from './components/Conference_Root.jsx'
import TopicCreation from './components/TopicCreation.jsx'
import CommitteeRegistration from './components/CommitteeRegistration.jsx'
import EmailFormation from './components/EmailFormation.jsx'
import ReviewPaper from './components/ReviewPaper.jsx'
import ReviewerInformationTable from './components/ReviewerInformationTable.jsx'
import MembersInfo from './components/MembersInfo.jsx'
import AuthorReport from './components/AuthorReport.jsx'
import AuthorReport2 from './components/AuthorReport2.jsx'
import Reports_root from './components/Reports_Root.jsx'
import ErrorPopup from './components/ErrorPopup.jsx'
import ReviewPaper2 from './components/ReviewPaper2.jsx'
import FirstAuthorList from './components/FirstAuthorList.report.jsx'
import AllAuthorList from './components/AllAuthorList.report.jsx'
import PaperWithRevList from './components/PaperWithRevList.report.jsx'
import PaperAllotedReviewers from './components/PaperAllotedReviewers.report.jsx'
import PaperSentCopyRight from './components/PaperSentCopyRight.report.jsx'
import CommitteeMenbersList from './components/CommitteeMembersList.report.jsx'
import {fetchfirstsuthors} from './Services/ConferenceServices.js'
import PaperStatusLastDate from './components/PaperStatusLastDate.report.jsx'
import { gellAllreviewersbyconid,getconid,fetchallauthors,fetchpaperwithreviewer,fetchpaperallotedtoreviewer,fetchpapersenttocopyright,fetchreviewers,conferenceAndTrack } from './Services/ConferenceServices'
// const router=createBrowserRouter(
//   createRoutesFromElements(
//       <Route path='/' element={<Login/>}></Route>,
//       <Route path='author-registration' element={<AuthorRegistration/>}></Route>,
//       <Route path='conference-creation' element={<ConferenceCreation/>}></Route>,
//       <Route path='track-creation' element={<TrackCreation/>}></Route>,
//       <Route path='committee-members-registration' element={<CommitteeMembersRegistration/>}></Route>,
//       <Route path='paper-review' element={<PaperAllotments/>}></Route>
//   )
// );

// const confernece_role=()=>{
//     let a,b;
//     gellAllRoles().then((Response)=>{
//        a=Response.data;
//     }).catch((err)=>{

//     })
//     listConferenceBtwDate().then((Response)=>{
//       b=Response.data;
//     }).catch((err)=>{
      
//     })
//     return {a,b};
// }
// const router=createBrowserRouter([
//   {
//     path:'/',
//     element:<Login/>
//   },
//   {
//     path:'/author-registration',
//     element:<AuthorRegistration/>,
//     loader:listConferenceBtwDate
//   },
//   {
//     path:'conference-creation',
//     element:<ConferenceCreation/>
//   },
//   {
//     path:'track-creation',
//     element:<TrackCreation/>,
//     loader:listConferenceBtwDate
//   },
//   {
//     path:'committee-members-registration',
//     element:<CommitteeMembersRegistration/>,
//     loader:listConferenceBtwDate
//   },
//   {
//     path:'paper-review',
//     element:<PaperAllotments/>,
    
//   },{
//     path:'header',
//     element:<Header/>
//   }
// ])

const router=createBrowserRouter([
  {
    path:'/',
    element:<Admin_Layout/>,
    
    children:[
      {
        path:'select-conference',
        element:<Conference_Root/>,
        loader:getAllConference
      },
      {
       path:'paper-review',
       element:<PaperAllotments/>,
       loader:getConferenceById,
       errorElement:<ErrorPopup message="Select conference first."   />
      },{
        path:'reviewer-info',
        element:<ReviewerInformationTable/>,
        loader:fetchreviewers,
        errorElement:<ErrorPopup message="Select conference first."   />
      },{
        path:'member-info',
        element:<MembersInfo/>,
        loader:getallmembersoftpcbyconid,
        // errorElement:<ErrorPopup message="Select conference first."   />
     
      },{
        path:'/email-formation',
        element:<EmailFormation/>,
        loader:getConferenceById,
        errorElement:<ErrorPopup message="Select conference first."   />
      },{
        path:'/review-paper',
        element:<ReviewPaper/>
      },{
        path:'/reports',
        element:<Reports_root/>,
        loader:getAllConference
      },{
        path:'/create-conference',
        element:<ConferenceCreation/>
      },{
        path:'/reviewers-registration',
        element:<ReviewersRegistration/>,
        loader:getconid,
        errorElement:<ErrorPopup message="Select conference first."   />
  
      },
      {
        path:'/committee-members-registration',
         element:<CommitteeMembersRegistration/>,
        // loader:getConferenceById,
        // errorElement:<ErrorPopup message="Select conference first."   />
      },{
        path:'/committee-registration',
        element:<CommitteeRegistration/>,
        loader:getConferenceById,
        errorElement:<ErrorPopup message="Select conference first."   />
      },{
        path:'/track-creation',
        element:<TrackCreation/>,
         loader:getConferenceById,
         errorElement:<ErrorPopup message="Select conference first."   />
      }
    ]
  } ,
    {
      path:'/author-registration',
      element:<AuthorRegistration/>,
      loader:getAllConference
    },{
      path:'/topic-creation',
      element:<TopicCreation/>,
      loader:getConferenceById,
      errorElement:<ErrorPopup message="Select conference first."   />
    },{
      path:'/author-report',
      element:<AuthorReport/>,
      loader:getallpaperandconauthorbyconid,
      errorElement:<ErrorPopup message="Select conference first."   />
    },{
      path:'/paper-report',
      element:<AuthorReport2/>,
      loader:getallpaperandtrackbyconid,
      errorElement:<ErrorPopup message="Select conference first."   />
    },{
      path:'/review-paper2',
      element:<ReviewPaper2/>
    },
    {
      path:'/first-authorlist-report',
      element:<FirstAuthorList/>,
      loader:fetchfirstsuthors
    },
    {
      path:'/all-authorlist-report',
      element:<AllAuthorList/>,
      loader:fetchallauthors
    },
    {
      path:'/paper-reviewers-report',
      element:<PaperWithRevList/>,
      loader:fetchpaperwithreviewer
    }
    ,
    {
      path:'/paper-allot-reviewers-report',
      element:<PaperAllotedReviewers/>,
      loader:fetchpaperallotedtoreviewer
    },{
      path:'/paper-sent-copy-right-report',
      element:<PaperSentCopyRight/>,
      loader:fetchpapersenttocopyright
    },{
      path:'/committee-member-list-report',
      element:<CommitteeMenbersList/>
    },
    {
      path:'/paper-status-report',
      element:<PaperStatusLastDate/>
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
