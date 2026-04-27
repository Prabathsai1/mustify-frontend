import axiosinstance from '../components/api/axios.jsx'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'

function Uploadmusic() {
    const [uploading, setuploading] = useState(false)
    const {
        register,
        handleSubmit, reset,
        formState: { errors },
    } = useForm();
    const Navigate = useNavigate()

    async function upload(data) {
        try {
            setuploading(true)
            const formData = new FormData();

            formData.append("musicName", data.musicName);
            formData.append("avatar", data.avatar[0]);
            formData.append("music", data.music[0]);
            const response = await axiosinstance.post(
                "/spotify/home/musicupload",
                formData,
                {
                    timeout: 20000
                }
            );
            toast.success(response.data.message)
             setuploading(false)
            reset()
        }
        catch (error) {
            setuploading(false)
            console.log(error.response.data)
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="min-h-screen bg-black/30 flex">

            <div className="w-full p-8">
                <button
                    onClick={() => Navigate("/home")}
                    className=" btn btn-sm bg-green-500 mb-4 btn-ghost text-white"
                >
                    ← Back
                </button>
                <h2 className="text-lg font-semibold mb-6">
                    Upload Music
                </h2>

                <form onSubmit={handleSubmit(upload)} className="space-y-4">

                    <div>
                        <input
                            type="text"
                            placeholder="Music name"
                            className="input mb-1 input-bordered w-full"
                            {...register('musicName', { required: true })}
                        />
                        {errors.musicName && (
                            <p className="text-error text-xs mt-1">Required</p>
                        )}
                    </div>

                    <div>
                        <label>avatar</label>
                        <input accept="image/jpeg, image/png"
                            type="file"
                            className="file-input mb-4 file-input-bordered w-full"
                            {...register('avatar', { required: true })}
                        />
                    </div>

                    <div>
                        <label>music</label>
                        <input accept="audio/mpeg"
                            type="file"
                            className="file-input file-input-bordered w-full"
                            {...register("music", { required: true })}
                        />
                    </div>

                    <button disabled={uploading} className="btn btn-neutral w-full mt-2">
                        {uploading?"uploading":"upload"}
                    </button>

                </form>
            </div>

        </div>
    );
}

export default Uploadmusic;