import React from 'react';
import AppRouter from "./components/App/appRouter";
import Head from "./components/head";


function App() {
  return (
      <div className={"App flex flex-col items-center"}>
          <Head title={"MyTitle!"}/>
          <AppRouter/>
      </div>
  );
}

export default App;
