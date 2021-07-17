import './styles.scss';

import { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustration from '../../assets/images/illustration.svg';
import moon from '../../assets/images/moon.svg';
import sun from '../../assets/images/sun.svg';
import logoImg from '../../assets/images/logo.svg';
import logoDarkImg from '../../assets/images/logo-dark.svg';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { useTheme } from '../../hooks/useTheme';

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();
    const { theme, toggleTheme } = useTheme();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        console.log(newRoom);

        if (newRoom.trim() === '') {
            return;
        }
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });

        history.push(`/admin/rooms/${firebaseRoom.key}`);

    }

    return (

        <div className="row m-0 p-0 vh-100">
            <aside className={"col-6 p-5 d-none d-lg-block d-md-block " + theme}>
                <div className="mt-5">
                    <img src={illustration} alt="Ilustração simbolizando perguntas e respostas" />



                </div>

                <strong> Crie salas de Q&amp;A ao vivo</strong>
                <p> Tire as dúvidas da sua audiência em tempo real</p>
            </aside>

            <div className={"col-12 col-md-6 " + theme}>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end mt-4">
                        <button type="button" onClick={toggleTheme}>
                            <img src={theme === 'light' ? moon : sun} alt="moonOrSun" />
                        </button>

                    </div>
                </div>
                <main className="d-flex justify-content-center align-items-center h-85">
                    <div className={"main-content " + theme}>
                        <img src={theme === 'light' ? logoImg : logoDarkImg} alt="Letmeask" />
                        <h2> Criar uma nova sala</h2>
                        <form className={theme} onSubmit={handleCreateRoom}>
                            <input
                                type="text"
                                placeholder="Nome da sala"
                                onChange={(event) => setNewRoom(event.target.value)}
                                value={newRoom}
                            />
                            <Button type="submit">
                                Criar sala
                            </Button>
                        </form>
                        <p>
                            Quer entrar em uma sala existente?

                            <Link to="/"> clique aqui </Link>
                        </p>
                    </div>
                </main>
            </div>


        </div>
    )
}