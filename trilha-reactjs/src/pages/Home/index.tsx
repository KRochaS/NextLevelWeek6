import './styles.scss';

import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import googleIconImg from '../../assets/images/google-icon.svg';
import illustration from '../../assets/images/illustration.svg';
import moon from '../../assets/images/moon.svg';
import sun from '../../assets/images/sun.svg';
import logoImg from '../../assets/images/logo.svg';
import logoDarkImg from '../../assets/images/logo-dark.svg';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { useTheme } from '../../hooks/useTheme';
import { RoomCode } from '../../components/RoomCode';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        console.log(roomCode);
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists.');
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room alredy close');
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }


    return (
        <div className={"row m-0 p-0 vh-100 " }>

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
                    <div className="main-content">
                        <img src={theme === 'light' ? logoImg : logoDarkImg} alt="Letmeask" />
                        <button onClick={handleCreateRoom} className="create-room">
                            <img src={googleIconImg} alt="Logo do Google" />
                            Crie sua sala com o Google
                        </button>

                        <div className="separator">
                            Ou entre em uma sala
                        </div>

                        <form className={theme} onSubmit={handleJoinRoom}>
                            <input
                                type="text"
                                placeholder="Digite o código da sala"
                                onChange={event => setRoomCode(event.target.value)}
                                value={roomCode}

                            />
                            <Button type="submit">
                                Entrar na sala
                            </Button>


                            <div className="d-flex justify-content-center codigo-existente">
                           Código: -Meq4wRvdmZjodgnq0x_
                        </div>
                        
                        </form>
                    </div>
                </main>
            </div>


        </div>
    )
}