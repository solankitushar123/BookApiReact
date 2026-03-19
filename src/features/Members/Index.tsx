import { useEffect, useState } from 'react'
import { Loader } from "../../shared/components/loader";
import { ApiService } from '../../services';
import Grid from '../../shared/components/grid';

interface Member {
  memberId: number;
  memberName: string;
  memberType: string;
}

export default function Member() {

  const [members, setMembers] = useState<Member[]>([]);
  const [memberName, setMemberName] = useState("");
  const [memberType, setMemberType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const validTypes = ["Standard", "Premium"];

  useEffect(() => {
    ApiService.get<Member[]>("Members")
      .then(data => setMembers(data))
      .catch(() => setError("Failed to load members"))
      .finally(() => setIsLoading(false));
  }, [])

  const createMember = () => {

    if (memberName.trim() === "") {
      setError("Member name is required");
      return;
    }

    if (!validTypes.includes(memberType)) {
      setError(`Member type must be exactly: ${validTypes.join(", ")}`);
      return;
    }

    const newMember = {
      memberName,
      memberType
    };

    ApiService.post<Member>("Members", newMember)   
      .then(data => {
        setMembers([...members, data])
        setMemberName("")
        setMemberType("")
        setError("")
      })
      .catch(() => setError("Failed to create member"));
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg">

      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Members List
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <>
          {/* Error Message */}
          {error && (
            <div className="text-red-600 mb-3 font-semibold">
              {error}
            </div>
          )}

          {/* Create Form */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Member Name"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="border-2 border-gray-300 p-2 rounded w-full"
            />

            <input
              type="text"
              placeholder="Member Type (Standard / Premium)"
              value={memberType}
              onChange={(e) => setMemberType(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <button
              onClick={createMember}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Create
            </button>
          </div>

          {/* Table */}
          <Grid<Member> data={members} />
        </>
      )}
    </div>
  )
}