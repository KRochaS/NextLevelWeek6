import './styles.scss';

import copyImg from '../../assets/images/copy.svg';


type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code);
    }

    return (
        <button title="Copiar código" className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copiar código da sala" />
            </div>
            <span className="d-none d-lg-block d-md-block">Sala #{props.code}</span>
        </button>

    )
}