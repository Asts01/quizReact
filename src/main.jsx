import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import LandingPage from './components/LandingPage.jsx';
import AddQuestion from './components/AddQuestion.jsx';
import Layout from './components/Layout.jsx';
import AddNewQuiz from './components/AddNewQuiz.jsx';
import AddExistingQuiz from './components/AddExistingQuiz.jsx';
import ShowAllQuestions from './components/ShowAllQuestions.jsx';
import { Provider } from 'react-redux';
import store from './components/store/store.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // Define child routes here if needed
      {
        path:"",
        element:<LandingPage/>
      },
      {
        path:"/addQuestion",
        element:<AddQuestion/>
      },
      {
        path:"/addNewQuiz",
        element:<AddNewQuiz/>
      },
      {
        path:"/addExistingQuiz",
        element:<AddExistingQuiz/>
      },
      {
        path:"/showAllQuestions",
        element:<ShowAllQuestions/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    {/* <App /> */}
    </StrictMode>
  </Provider>
  
);
