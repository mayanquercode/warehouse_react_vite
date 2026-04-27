import { useEffect, useState } from "react";
import { Avatar, Box, Chip, Toolbar, Typography } from "@mui/material";
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "../redux/sessionSlice";
import { supabase } from "../libs/supabase";


export default function Header() {

    const session = useAppSelector(state => state.session)
    const dispatch = useAppDispatch()
    const [userName, setUserName] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');

    useEffect(() => {
        if (session) {
            setUserName(session.user.user_metadata.display_name)
            setAvatar(session.user.user_metadata.avatar_url);
        }
    }, [session])

    const onClickSignOut = async () => {
        await supabase.auth.signOut()
        dispatch(signOut())
    }

    return (
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 'bold', width: 36, height: 36 }} src={avatar} />
                <Box>
                    <Typography variant="subtitle2" component="h1" sx={{ color: 'text.primary', fontWeight: 900, lineHeight: 1.2, fontSize: '0.8rem' }}>
                        LA CASA DE LA CERÁMICA
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: '0.65rem' }}>
                        {userName}
                    </Typography>
                </Box>
            </Box>
            <Chip
                onClick={onClickSignOut}
                icon={<LogoutIcon sx={{ fontSize: '14px !important' }} />}
                label="Cerrar seccion"
                size="small"
                color="error"
                variant="outlined"
                sx={{ fontWeight: 'bold', fontSize: '10px', padding: '0 8px' }}
            />
        </Toolbar>

    )
}
