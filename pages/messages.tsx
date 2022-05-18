
import { NextPage } from 'next';
import { MainLayout } from '../layouts/MainLayout';



interface MessagesPageProps { }

const Messages: NextPage = ({ }: MessagesPageProps) => {
    return (
        <div>
            <MainLayout>
                Это Сообщения
            </MainLayout>
        </div>
    )
}

export default Messages