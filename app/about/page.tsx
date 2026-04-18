import s from "@/styles/pages.module.css";

export default function About() {
  return (
    <div>
      <header className={s.pageHeader}>
        <div className={s.container}>
          <span className={s.eyebrow}>About</span>
          <h1 className={s.pageTitle}>A publication by young people working on climate.</h1>
        </div>
      </header>
      <div className={s.containerSection}>
        <div className={s.aboutGrid}>
          <div>
            <h2 className={s.aboutH}>What we are</h2>
            <p>Youth × Earth publishes essays, letters, and discussions by young people working on climate and policy — written for readers who want primary voices, not summaries.</p>
            <p style={{ marginTop: 16 }}>We are global: 23 countries at time of writing, with 47 ambassadors leading local reporting.</p>
          </div>
          <div>
            <h2 className={s.aboutH}>Why we started</h2>
            <p>Too much climate writing speaks about youth, and not enough is written by them. We began as a group of students and educators frustrated with briefings that never included the people they were briefing about.</p>
          </div>
          <div>
            <h2 className={s.aboutH}>Our standard</h2>
            <p>Every published piece is signed with a real name and a specific place. Every discussion is moderated. Every ambassador is paid for their time.</p>
          </div>
          <div>
            <h2 className={s.aboutH}>Editorial policy</h2>
            <p>We edit for clarity and accuracy, not for voice. A writer&rsquo;s perspective and style are theirs. We publish in the original language with an English translation side by side.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
