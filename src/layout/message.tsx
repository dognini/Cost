import { useEffect, useState } from "react";
import "../styles/layout/message.css";

interface MessageProps {
    type: string
    message: string
}

const Message = ({ type, message }: MessageProps) => {

    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {

        if (!message) {
            setVisible(false)

            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [message])

    return (
        <>
            {
                visible && (
                    <div className={`message ${type}`}> {message} </div>
                )
            }
        </>
    )
}

export default Message;