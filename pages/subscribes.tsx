
import { NextPage } from 'next';
import { MainLayout } from '../layouts/MainLayout';



interface SubscribessPageProps { }

const Subscribes: NextPage = ({ }: SubscribessPageProps) => {
    return (
        <div>
            <MainLayout>
                Это Подписки
            </MainLayout>
        </div>
    )
}

export default Subscribes