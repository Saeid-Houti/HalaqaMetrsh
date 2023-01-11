"use client"
import React from 'react'
import styles from '../page.module.css'
import { NextUIProvider, Input, Button, Spacer } from "@nextui-org/react"
import { LockIcon } from './lockIcon';
import { GithubIcon } from './GithubIcon';
import { GoogleIcon } from './GoogleIcon';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'
import Link from 'next/link';
import { useSession, signIn, signOut, SessionProvider, getSession } from "next-auth/react";
// import { redirect } from 'next/dist/server/api-utils';
import { redirect } from 'next/navigation';

export default function login() {

    const { data: session } = useSession()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [teachersArray, setTeachersArray] = useState([])
    const [parentsArray, setParentsArray] = useState([])
    const router = useRouter()

    async function getTeachersData() {
        const res = await fetch('/api/teachers');
        const teachers = JSON.parse(await res.json())
        setTeachersArray(teachers)
    }

    async function getParentsData() {
        const res = await fetch('/api/parents');
        const parents = JSON.parse(await res.json())
        setParentsArray(parents)
    }

    useEffect(() => {
        getTeachersData();
        getParentsData();
    }, [])



    const authorized = teachersArray.find((teacher) => teacher.email == 'coordinator@halaqa.org' && teacher.password == 'password')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const teacher = teachersArray.find((teacher) => teacher.email == email && teacher.password == password)
        const parent = parentsArray.find((parent) => parent.email == email && parent.password == password)

        if (teacher) {
            Cookies.set("loggedin", true)
            localStorage.setItem("logged in user", JSON.stringify(teacher))
            router?.push(`/halaqat`)
            window.location.reload()
            if (session) {
                signOut()
            }
        }
        else if (parent) {
            Cookies.set("loggedin", true)
            localStorage.setItem("logged in user", JSON.stringify(parent))
            router?.push(`/halaqat`)
            window.location.reload()
            if (session) {
                signOut()
            }
        }
        else {
            alert("wrong email or password")
        }
    };
    const handleGithub = () => {
        if (session && authorized) {
            Cookies.set("loggedin", true)
            localStorage.setItem("logged in user", JSON.stringify(authorized))
            router?.push(`/halaqat`)
            window.location.reload()
            // redirect('/halaqat');

        }
        else {
            signIn()
        }
    }

    return (

        <div className={styles.container}>
            <main className={styles.main}>
                <form className='form' onSubmit={handleSubmit}>
                    <Input size="lg" placeholder="Email"
                        type='email'
                        className='form-input'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    <Spacer y={0.5} />

                    <Input size="lg" placeholder="Password"
                        type='password'
                        className='form-input'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                    <Spacer y={1} />

                    <Button type='submit' icon={<LockIcon fill="currentColor" />} color="success">
                        Login
                    </Button>



                </form>
                <h5 style={{ textAlign: 'center' }} >OR</h5>
                {/* <Link href="/halaqat"> */}
                <Button onClick={handleGithub} type='secondary' style={{ display: 'flex', justifyContent: 'end', marginBottom: 5 }} icon={<GithubIcon fill="currentColor" />} color="secondary">
                    Sign in with GitHub
                </Button>
                {/* </Link> */}
                <Button onClick={handleGithub} type='primary' style={{ display: 'flex', justifyContent: 'end' }} icon={<GoogleIcon fill="currentColor" />} color="primary">
                    Sign in with Google
                </Button>
            </main>
        </div>
    )
}

// export const getServerProps = async (context) => {
//     const session = await getSession(context)
//     if (session) {
//         return {
//             redirect: {
//                 destination: '/halaqat'
//             }
//         };
//     }

//     return {
//         props: { session }
//     };

// };

