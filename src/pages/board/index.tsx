import { useState, FormEvent } from 'react'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'

import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'
import { SuppotButton } from '../../components/Support'
import { format } from 'date-fns'

import { db } from '../../services/firebaseConnection'
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Link from 'next/link'


interface BoardProps {
    user: {
        id: string,
        name: string,
    }
}

export default function Board({ user }: BoardProps) {


    const [input, setInput] = useState('')
    const [taskList, setTaskList] = useState([])

    async function handleAddTask(e: FormEvent) {
        e.preventDefault()

        if (input === '') {
            alert('Preencha alguma tarefa!')
            return
        }

        await addDoc(collection(db, "tarefas"), {
            created: new Date(),
            tarefa: input,
            userId: user.id,
            name: user.name
        })
            .then((doc) => {
                console.log('cadastrado com sucesso')
                let data = {
                    id: doc.id,
                    created: new Date(),
                    createdFormated: format(new Date(), 'dd MMMM yyyy'),
                    tarefa: input,
                    userId: user.id,
                    name: user.name
                }

                setTaskList([...taskList, data])
                setInput('')
            })
            .catch((err) => {
                console.log('Erro ao Cadastrar: ', err)
            })
    }


    return (
        <>
            <Head>
                <title>Minhas tarefas - Board</title>
            </Head>
            <main className={styles.container}>
                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        placeholder='Digite a sua tarefa...'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <button type='submit'>
                        <FiPlus size={25} color='#17181f' />
                    </button>
                </form>

                <h1>Você tem 2 tarefas!</h1>

                <section>
                    {taskList.map(task => (
                        <article className={styles.taskList}>

                            <Link href={`/board/${task.id}`}>
                                <p>{task.tarefa}</p>
                            </Link>

                            <div className={styles.actions}>
                                <div>
                                    <div>
                                        <FiCalendar size={20} color='#FFB800' />
                                        <time>{task.createdFormated}</time>
                                    </div>
                                    <button>
                                        <FiEdit2 size={20} color='#fff' />
                                        <span>Editar</span>
                                    </button>
                                </div>

                                <button>
                                    <FiTrash size={20} color='#FF3636' />
                                    <span>Excluir</span>
                                </button>
                            </div>
                        </article>
                    ))}


                </section>
            </main>

            <div className={styles.vipContainer}>
                <h3>Obrigado por apoiar esse projeto.</h3>
                <div>
                    <FiClock size={28} color='#fff' />
                    <time>
                        última doação foi a 3 dias.
                    </time>
                </div>
            </div>

            <SuppotButton />
        </>

    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req })
    if (!session?.user.id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const user = {
        name: session?.user.name,
        id: session?.user.id,
    }

    return {
        props: {
            user
        }
    }
}
