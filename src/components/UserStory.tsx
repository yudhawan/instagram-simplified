import { defaultPicture } from "../common/constant"
import { Inputs } from "../types"

function UserStory({user}:{story:object[],user:Inputs}) {
  return (
    <>
      <img src={`${user.picture?user.picture:defaultPicture}`} alt="user" width={56} height={56} loading="lazy" className="rounded-full border-[0.5px] border-gray-300 w-14 h-14" />
    </>
  )
}

export default UserStory