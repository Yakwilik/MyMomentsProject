import React from 'react';
import AppRouter from "./components/appRouter";
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
