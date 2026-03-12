import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

export default function Home() {
    let navigate = useNavigate();
    return (
        <section>
            <div>
                <Button onClick={() => navigate('/dispatch')} variant="contained" >Despachar ceramica</Button>
                <Button onClick={() => navigate('/kardex')} variant="contained" >Kardex</Button>
            </div>
        </section>
    )
}
