import React from 'react';
import PageContainer from '../PageContainer/PageContainer';
import './Home.css';

const Home = () => {
  return (
    <PageContainer>
      <div className="home">
        <h1>Home</h1>
        <p>Please choose <strong>Board</strong> to start drawing.</p>
      </div>
    </PageContainer>
  );
};

export default Home;
