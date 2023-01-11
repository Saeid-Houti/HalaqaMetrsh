"use client"
import styles from './page.module.css'
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import { Text, Button } from "@nextui-org/react";

// import headerImg from "./assets/img/header-img.svg";
// import { HeaderImg } from './HeaderImg';
export default function Home() {
  return (

    // <Banner />
    // <SessionProvider>
    //   <IndexPage />
    // </SessionProvider>

    <div className={styles.container}>
      <main className={styles.main}>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $purple600 80%, $pink600 90%",
          }}
          weight="bold"
        >
          Welcome to Halaqa Metrash      </Text>

        <p className={styles.description}>
          <Text
            h6
            size={30}
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
            }}
            weight="bold"
          >
            Halaqa Metrash is a place where Muslims can learn and memorize the Quran          </Text>        </p>

        <div className={styles.grid}>
          <a href="/login" className={styles.card}>
            <Button style={{ margin: '0 35%' }} size="lg" shadow color="gradient" auto>
              Start
            </Button>
          </a>

        </div>
      </main>

    </div>
  )
}
// function IndexPage() {
//   const { data: session } = useSession()
//   if (session) {
//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//         <h1>Dashboard Page</h1>
//         <p>
//           This is a secure page only accessible to authenticated admin users.
//         </p>
//       </>
//     )
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn()}>Sign in</button>
//     </>
//   )
// }

// const Banner = () => {
//   const [loopNum, setLoopNum] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [text, setText] = useState('');
//   const [delta, setDelta] = useState(300 - Math.random() * 100);
//   const [index, setIndex] = useState(1);
//   const toRotate = ["Quran Memorization Center"];
//   const period = 2000;
//   const router = useRouter();


//   useEffect(() => {
//     let ticker = setInterval(() => {
//       tick();
//     }, delta);

//     return () => { clearInterval(ticker) };
//   }, [text])

//   const tick = () => {
//     let i = loopNum % toRotate.length;
//     let fullText = toRotate[i];
//     let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

//     setText(updatedText);

//     if (isDeleting) {
//       setDelta(prevDelta => prevDelta / 2);
//     }

//     if (!isDeleting && updatedText === fullText) {
//       setIsDeleting(true);
//       setIndex(prevIndex => prevIndex - 1);
//       setDelta(period);
//     } else if (isDeleting && updatedText === '') {
//       setIsDeleting(false);
//       setLoopNum(loopNum + 1);
//       setIndex(1);
//       setDelta(500);
//     } else {
//       setIndex(prevIndex => prevIndex + 1);
//     }
//   }
//   const move = () => {

//   }
//   return (
//     <section className="banner" id="home">
//       <Container>
//         <Row className="aligh-items-center">
//           <Col xs={12} md={6} xl={7} style={{ display: 'flex' }}>
//             <TrackVisibility>
//               {({ isVisible }) =>
//                 <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
//                   <span className="tagline">Welcome to HalaqaMetrash</span>
//                   <h1>{`Hi! This is Halaqa`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Holy Quran Memorization Center"]'><span className="wrap">{text}</span></span></h1>
//                   <p style={{ color: 'white' }}>The Holy Quran is the central religious text of Islam, and memorization is an important aspect of Islamic religious practice. A Holy Quran Memorization Center is a place where Muslims can learn and memorize the Quran. These centers may be affiliated with a mosque or Islamic community center, and may offer classes or other programs to help students learn and retain the Quran. Many Muslims consider memorization of the Quran to be a deeply spiritual and meaningful pursuit, and many Islamic schools and educational institutions place a strong emphasis on Quranic memorization as part of their curriculum.</p>
//                   <a href='/login' >
//                     <button
//                       style={{ cursor: 'pointer' }} >Let’s Start <ArrowRightCircle size={25} /></button>
//                   </a>
//                 </div>}
//             </TrackVisibility>
//           </Col>
//           <Col xs={12} md={6} xl={5}>
//             <TrackVisibility>
//               {({ isVisible }) =>
//                 <div className={isVisible ? "animate__animated animate__zoomIn" : ""} style={{ textAlign: 'end' }}>
//                   <img src="https://img.icons8.com/nolan/64/bright-moon.png" style={{ width: 200, height: 200 }} alt="Header Img" />
//                 </div>}
//             </TrackVisibility>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   )
// }