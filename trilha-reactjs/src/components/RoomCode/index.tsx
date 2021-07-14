import './styles.scss';

import copyImg from '../../assets/images/copy.svg';
import { useTheme } from '../../hooks/useTheme';


type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    const { theme } = useTheme();

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code);
    }

    return (
        <button title="Copiar código" className={"room-code " + theme} onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copiar código da sala" />
            </div>
            <span className="d-none d-lg-block d-md-block">Sala #{props.code}</span>
        </button>

    )
}