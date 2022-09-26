import Head from 'next/head'
import styles from './styles.module.scss'
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'

export default function Board() {
    return (
        <>
            <Head>
                <title>Minhas tarefas - Board</title>
            </Head>
            <main className={styles.container}>
                <form>
                    <input
                        type="text"
                        placeholder='Digite a sua tarefa...'
                    />

                    <button type='submit'>
                        <FiPlus size={25} color='#17181f' />
                    </button>
                </form>

                <h1>Você tem 2 tarefas!</h1>

                <section>
                    <article className={styles.taskList}>
                        <p>Lorem ipsum dolor sit amet consectetur agdsa</p>
                        <div className={styles.actions}>
                            <div>
                                <div>
                                    <FiCalendar size={20} color='#FFB800' />
                                    <time>26 Setembro 2022</time>
                                </div>
                                <button>
                                    <FiEdit2 size={20} color='#fff'/>
                                    <span>Editar</span>
                                </button>
                            </div>

                            <button>
                                <FiTrash size={20} color='#FF3636' />
                                <span>Excluir</span>
                            </button>
                        </div>
                    </article>
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
        </>

    )
}