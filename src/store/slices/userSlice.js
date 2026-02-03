const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        username: null,
        email: null,
        favoriteLocations: [],
        isAuthenticated: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isAuthenticated = true;
        },
        updateFavorites: (state, action) => {
            if (action.payload.type === 'add') {
                state.favoriteLocations.push(action.payload.location);
            } else if (action.payload.type === 'remove') {
                state.favoriteLocations = state.favoriteLocations.filter(
                    id => id !== action.payload.locationId
                );
            }
        },
        logout: (state) => {
            state.userId = null;
            state.username = null;
            state.email = null;
            state.favoriteLocations = [];
            state.isAuthenticated = false;
        },
    },
});