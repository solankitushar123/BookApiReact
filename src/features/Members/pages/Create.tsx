import React, { useState } from 'react';
import { Loader } from '../../../shared/components/loader';
import { ApiService } from '../../../services';

type Props = {
  onCreated: () => void;
};

export default function Create({ onCreated }: Props) {
  const [memberName, setMemberName] = useState("");
  const [memberType, setMemberType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validTypes = ["Standard", "Premium"];

  const createMember = () => {
    if (memberName.trim() === "") {
      setError("Member name is required");
      return;
    }

    if (!validTypes.includes(memberType)) {
      setError(`Member type must be: ${validTypes.join(" / ")}`);
      return;
    }

    const newMember = {
      memberName,
      memberType
    };

    setIsLoading(true);

    ApiService.post("Members", newMember)
      .then(() => {
        onCreated(); // ✅ refresh parent table
        setMemberName("");
        setMemberType("");
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to create member");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>

      {/* Error */}
      {error && (
        <div className="text-red-600 mb-3 font-semibold text-center">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Member Name"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded w-full text-black"
        />

        <select
          value={memberType}
          onChange={(e) => setMemberType(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full bg-white text-black"
        >
          <option value="">Select Type</option>
          {validTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <button
          onClick={createMember}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="flex justify-center mt-4">
          <Loader />
        </div>
      )}

    </div>
  );
}