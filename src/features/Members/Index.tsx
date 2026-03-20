import { useCallback, useEffect, useState } from 'react'
import { Loader } from "../../shared/components/loader";
import { ApiService } from '../../services';
import Grid from '../../shared/components/grid';
import Create from './pages/Create';

interface Member {
  memberId: number;
  memberName: string;
  memberType: string;
}

export default function Member() {

  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Load members

 const loadMembers = useCallback(() => {
  
  ApiService.get<Member[]>("Members")
    .then(data => setMembers(data))
    .catch(() => setError("Failed to load members"))
    .finally(() => setIsLoading(false));
}, []);

 useEffect(() => {
  loadMembers();
}, [loadMembers]);

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
          {/* Error */}
          {error && (
            <div className="text-red-600 mb-3 font-semibold">
              {error}
            </div>
          )}

          {/* Create Form */}
          <Create onCreated={loadMembers} />

          {/* Table */}
          <Grid<Member> data={members} />
        </>
      )}
    </div>
  )
};