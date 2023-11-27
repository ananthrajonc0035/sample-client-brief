import type{Account} from "@/types/account";

export const useAccount = () => {
    const accountList = useState<Account[]>("account-list",()=> {
        return [];
    })
    const fetchAccountlist = async() =>{
       
        try{
            const res = await fetch(
              `${useRuntimeConfig().public.baseUrl}/api/v1/accounts/search`
            );
            const data = await res.json()
            
            if (data?.accounts) {
                accountList.value = data.accounts as Account[]
            }
        }catch (err) {
                console.error(err,"error");
        }
    }
    return {
        accountList,
        fetchAccountlist
    }
}