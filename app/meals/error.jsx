"use client";

const MealsErrorPage = ({ error }) => {
  return (
    <main className="error">
      <h1>An Error Occurred!</h1>
      <p>Failed to fetch meals data. Please try again later.</p>
    </main>
  );
};

export default MealsErrorPage;
