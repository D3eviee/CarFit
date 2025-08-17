import DashboardUserProfileContainerWrapper from "./dashboard-profile-container-wrapper"
import DashboardProfileDataEditButton from "./dashboard-profile-data-edit-button"

type DashboardProfileDataProps = {
    email: string,
    owner: string,                
}

export const DashboardProfileData = ({ owner, email }:DashboardProfileDataProps) => {
    return(
        <DashboardUserProfileContainerWrapper>
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex justify-end">
                    <DashboardProfileDataEditButton email={email} owner={owner} />
                </div>
                <div className="w-full flex flex-col gap-2 px-2">
                    <div className="w-full flex flex-col gap-0.5 text-middle text-[#111]">
                        <p className="font-semibold">Imię i nazwisko</p>
                        <p className="font-base">{owner}</p>
                    </div>
                    <hr className="w-full border-[0.5px] text-[#D4D4D4]"></hr>
                    <div className="w-full flex flex-col gap-0.5 text-middle text-[#111]">
                        <p className="font-semibold">Email</p>
                        <p className="font-base">{email}</p>
                    </div>
                </div>
            </div>  
        </DashboardUserProfileContainerWrapper>
    )
}