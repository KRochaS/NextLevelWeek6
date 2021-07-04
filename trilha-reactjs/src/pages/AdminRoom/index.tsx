import './styles.scss';

import { useHistory, useParams } from 'react-router-dom';

import answerImg from '../../assets/images/answer.svg';
import checkImg from '../../assets/images/check.svg';
import deleteImg from '../../assets/images/delete.svg';
import logoImg from '../../assets/images/logo.svg';
import powerOff from '../../assets/images/powerOff.svg';
import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
import { useRoom } from '../../hooks/useRoom';
import { database } from '../../services/firebase';


type RoomParams = {
    id: string;
}


export function AdminRoom() {
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const history = useHistory();



    const { title, questions, loading } = useRoom(roomId);

    console.log(questions);

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }

    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <span className="d-none d-lg-block d-md-block">
                            <Button isOutlined onClick={handleEndRoom}> Encerrar Sala</Button>
                        </span>
                        <button onClick={handleEndRoom} className="d-block d-lg-none d-md-none powerOff">
                            <img src={powerOff} alt="Encerrar Sala" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="col-12 p-3 d-flex flex-column align-items-center h-100">
                <div className="container">
                    <div className="room-title">
                        <h1>Sala {title} </h1>
                        {
                            questions.length > 0 && (
                                <span> {questions.length} pergunta(s) </span>
                            )
                        }
                    </div>



                    <div className="question-list">
                        {
                            questions.map((question) => {
                                return (
                                    <Question
                                        key={question.id}
                                        content={question.content}
                                        author={question.author}
                                        isAnswered={question.isAnswered}
                                        isHighlighted={question.isHighlighted}
                                    >

                                        {
                                            !question.isAnswered && (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                                    >
                                                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleHighlightQuestion(question.id)}
                                                    >
                                                        <img src={answerImg} alt="Dar destaque a pergunta" />
                                                    </button>
                                                </>
                                            )
                                        }

                                        <button
                                            type="button"
                                            onClick={() => handleDeleteQuestion(question.id)}
                                        >
                                            <img src={deleteImg} alt="Remover pergunta" />
                                        </button>
                                    </Question>


                                )
                            })
                        }


                        {loading && (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only"></span>
                                </div>
                            </div>
                        )}

                        {questions.length === 0 && loading === false && (
                            <div className="alert alert-info" role="alert">
                                Não há perguntas ainda.
                            </div>
                        )}

                    </div>
                </div>

            </main>
        </div>
    )
}