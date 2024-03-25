import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext";
export const useLogout = () => {
const {dispatch} = useAuthContext();
const {dipatch:workoutDispatch} = useWorkoutsContext();
    const logout = ()=>{
        // to remove user from local sotrage
        localStorage.removeItem('user')

        // dispatch to remove user from context
        dispatch({type: 'LOGOUT'})
        workoutDispatch({type: 'Logout', payload: null})
    }
    return logout;
}
