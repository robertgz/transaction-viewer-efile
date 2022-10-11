import { createDatabase } from '../database/initialize';
import { useEffect, useState } from 'react';
import Viewer from '../components/viewer';
import { Provider } from 'rxdb-hooks';
import { SnackbarProvider } from 'notistack';

export default function Home() {
  let [database, setDatabase] = useState(null);
 
  useEffect(() => {
    const doDb = async () => {
      const result = await createDatabase();
      setDatabase(result);
    }
    console.log('Home useEffect');

    doDb().catch(console.error);
  }, []);

  return (
    <Provider db={database}>
      <SnackbarProvider maxSnack={3}>
        <Viewer />
      </SnackbarProvider>
    </Provider>
  )
}
