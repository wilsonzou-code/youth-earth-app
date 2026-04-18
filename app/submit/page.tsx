import { SubmitForm } from "@/components/SubmitForm";
import s from "@/styles/pages.module.css";

export default function Submit() {
  return (
    <div>
      <header className={s.pageHeader}>
        <div className={s.container}>
          <span className={s.eyebrow}>Submit</span>
          <h1 className={s.pageTitle}>Submit your writing.</h1>
          <p className={s.pageDek}>Essays up to 2000 words, letters up to 400. We review within two weeks.</p>
        </div>
      </header>
      <div className={s.containerSection}>
        <SubmitForm />
      </div>
    </div>
  );
}
