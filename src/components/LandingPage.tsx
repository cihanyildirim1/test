import "./LandingPage.css";

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className='landing-page'>
      <div className='landing-content'>
        <div className='hero-section'>
          <h1 className='main-title'>🇺🇸 US Citizenship Test Practice</h1>
          <p className='subtitle'>
            Master the 100 civics questions for your naturalization interview
          </p>
        </div>

        <div className='features-grid'>
          <div className='feature-card'>
            <div className='feature-icon'>📚</div>
            <h3>Complete Question Bank</h3>
            <p>All 100 official USCIS civics questions with detailed answers</p>
          </div>

          <div className='feature-card'>
            <div className='feature-icon'>🌍</div>
            <h3>Bilingual Support</h3>
            <p>
              Study in both English and Turkish with instant translation toggle
            </p>
          </div>

          <div className='feature-card'>
            <div className='feature-icon'>🔊</div>
            <h3>Audio Playback</h3>
            <p>
              Listen to questions read aloud to improve pronunciation and
              comprehension
            </p>
          </div>

          <div className='feature-card'>
            <div className='feature-icon'>📊</div>
            <h3>Track Progress</h3>
            <p>
              Visual progress bar to monitor your advancement through all
              questions
            </p>
          </div>

          <div className='feature-card'>
            <div className='feature-icon'>🎯</div>
            <h3>Organized Categories</h3>
            <p>
              Questions grouped by topic: American Government, History, and
              Civics
            </p>
          </div>

          <div className='feature-card'>
            <div className='feature-icon'>🌙</div>
            <h3>Dark Mode</h3>
            <p>
              Comfortable studying experience with light and dark theme options
            </p>
          </div>
        </div>

        <div className='info-section'>
          <h2>About the Naturalization Test</h2>
          <p>
            During your naturalization interview, you will be asked up to 10
            questions from the list of 100 civics questions. You must answer at
            least 6 questions correctly to pass the civics portion of the test.
          </p>
          <p>This practice tool helps you prepare by allowing you to:</p>
          <ul>
            <li>Review all questions at your own pace</li>
            <li>Study with translations for better understanding</li>
            <li>Navigate freely between questions and categories</li>
            <li>Listen to questions for pronunciation practice</li>
          </ul>
        </div>

        <button className='start-button' onClick={onStart}>
          Start Practicing
          <span className='button-arrow'>→</span>
        </button>

        <div className='footer-note'>
          <p>
            💡 <strong>Tip:</strong> Study regularly and try to understand the
            context behind each answer, not just memorize them. Good luck with
            your citizenship journey!
          </p>
        </div>
      </div>
    </div>
  );
};
