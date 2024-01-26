export class refreshToken
{
    async execute (refreshToken: string)
    {
        // Verificar se este refresh token realmente existe no Banco de dados;

        // Gero um novo token com os dados do usuário dono do refresh token
        // Descarto o refresh token e salvo um novo ao banco de dados
        // retorno o novo access token para a memória
    }
}