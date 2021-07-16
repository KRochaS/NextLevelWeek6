import './styles.scss';

import cx from 'classnames';
import { ReactNode } from 'react';
import { useTheme } from '../../hooks/useTheme';

type QuestionsProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    },
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false
}: QuestionsProps) {
    const { theme } = useTheme();

    return (
        <div className={cx(
            'question',
            { answered: isAnswered },
            { highlighted: isHighlighted && !isAnswered },
            
           
        ) +' '+ theme}>
            <p className={theme}>
                {content}
            </p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span className={theme}> {author.name} </span>
                </div>
                <div>

                    {
                        children
                    }
                </div>
            </footer>
        </div>
    );
}