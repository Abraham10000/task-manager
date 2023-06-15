import Head from "next/head";
import { useRouter } from "next/router";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (serverTime: Date, clientTime: Date) : string => {
  const difference = serverTime.getTime() - clientTime.getTime();

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

export async function getServerSideProps() {
  const serverTime = new Date();
  const clientTime = new Date();
  const timeDifference = calculateTimeDifference(serverTime, clientTime);

  return {
    props: {
      serverTime: serverTime.toString(),
      timeDifference,
    },
  };
}

interface HomeProps {
  serverTime: string;
  timeDifference: string;
}


export default function Home({serverTime, timeDifference} : HomeProps) {
  const router = useRouter();
   const clientTime = new Date();


  const moveToTaskManager = () => {
    router.push("/tasks");
  }
  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time:{" "}
            <span className="serverTime">{serverTime}</span>
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:{" "}
            <span className="serverTime">{timeDifference}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
