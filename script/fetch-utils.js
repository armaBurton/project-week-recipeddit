const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyMTg0Mjc3LCJleHAiOjE5NTc3NjAyNzd9.kSPiiISCwyV3_bbykn8z6FThl1HvsZ0OFXo4evlAon8';

const SUPABASE_URL = 'https://esjhwxqfmwrbnnyyxfav.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export const getUser = () => {
    const user = client.auth.user();
    console.log(user);
    return user;
};

export async function checkAuth() {
    const user = await getUser();
    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('../landing');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });

    const signin = await client
        .from('profile')
        .insert([{
            username: 'Cadillac Jack',
            email: email,
        }]);
    console.log(signin);
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

export const fetchAllLists = async() => {
    const response = await client 
        .from('recipes')
        .select();

    console.log(response);

    return checkError(response);
};

export const fetchMyLists = async() => {
    const user = getUser();
    const myrecipes = await client
        .from('recipes')
        .select()
        .match({ user_id: user.id });

    console.log(myrecipes);

    checkError(myrecipes);
};

export const fetchListItem = async(id) => {
    const response = await client
        .from('recipes')
        .select()
        .match({ id });
    return checkError(response);
};