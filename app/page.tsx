import classes from '../css/Page.module.css';

function Page() {
  return (
    <main className={classes.main}>
      <h1 className={classes.title}>Welcome to Template!</h1>

      <p className={classes.description}>
        Get started by editing
        <code className={classes.code}>app/page.tsx</code>
      </p>

      <div className={classes.grid}>
        <div className={classes.card}>
          <h2>Nice cards &rarr;</h2>
          <p>Edit template</p>
        </div>
      </div>
    </main>
  );
}

export default Page;
