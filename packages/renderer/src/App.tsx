
import { FC } from 'react';
import { useRoutes } from "react-router-dom";
import router from "./router";
import styles from '@/styles/app.module.scss';


const App: FC = () => {
    const element = useRoutes(router);

    return (
        <div className={styles.app}>
            <header className={styles.appHeader} />
            {element}
        </div>
    )
}

export default App
