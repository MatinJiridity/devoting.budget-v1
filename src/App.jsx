import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import PollsList from "./components/Poll/PollsList";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import AddPoll from "./components/Poll/AddPoll";
import SinglePollPage from "./components/Poll/SinglePollPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />
        
        <Route path="/auth">
          <Route index element={<Auth/>}/>
          <Route path=":userId" element={<AddPoll/>} />  
        </Route>

        <Route path="/poll">
          <Route index element={<PollsList/>} />
          <Route path=":pollId" element={<SinglePollPage/>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
  )
}

export default App