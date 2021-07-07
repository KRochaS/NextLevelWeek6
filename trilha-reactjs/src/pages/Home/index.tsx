import './styles.scss';

import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import googleIconImg from '../../assets/images/google-icon.svg';
import illustration from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
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
        <div className="row m-0 p-0 vh-100">

            <aside className="col-6 p-5 d-none d-lg-block d-md-block">
                <div className="mt-5">
                    <img src={illustration} alt="Ilustração simbolizando perguntas e respostas" />


                </div>

                <strong> Crie salas de Q&amp;A ao vivo</strong>
                <p> Tire as dúvidas da sua audiência em tempo real</p>
            </aside>

            <div className="col-12 col-md-6 bg-blue">
                <main className="d-flex justify-content-center align-items-center h-100">
                    <div className="main-content">
                        <img src={logoImg} alt="Letmeask" />
                        <button onClick={handleCreateRoom} className="create-room">
                            <img src={googleIconImg} alt="Logo do Google" />
                            Crie sua sala com o Google
                        </button>

                        <div className="separator">
                            Ou entre em uma sala
                        </div>

                        <form onSubmit={handleJoinRoom}>
                            <input
                                type="text"
                                placeholder="Digite o código da sala"
                                onChange={event => setRoomCode(event.target.value)}
                                value={roomCode}

                            />
                            <Button type="submit">
                                Entrar na sala
                            </Button>
                        </form>
                    </div>
                </main>
            </div>


        </div>
    )
}