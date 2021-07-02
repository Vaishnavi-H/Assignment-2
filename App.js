import Multiselect from "./Components/Multiselect";
import { QueryClientProvider, QueryClient } from 'react-query';


 
    

 function App() {

    const queryClient = new QueryClient()

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div>
                    <Multiselect />
                </div>
            </QueryClientProvider>
        </>
    )
}
 

export default App;
