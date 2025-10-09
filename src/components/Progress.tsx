interface ProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export function Progress({ currentQuestion, totalQuestions }: ProgressProps) {
  return (
    <div className='progress-section'>
      <div className='progress-info'>
        <h3>Progress</h3>
        <p>
          Question {currentQuestion + 1} of {totalQuestions}
        </p>
      </div>
      <div className='progress-bar'>
        <div
          className='progress-fill'
          style={{
            height: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
          }}
        />
      </div>
      <div className='progress-stats'>
        <p>
          Completed: {currentQuestion + 1}/{totalQuestions}
        </p>
        <p>Remaining: {totalQuestions - (currentQuestion + 1)}</p>
      </div>
    </div>
  );
}
