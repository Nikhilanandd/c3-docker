'use client';

import { useState, useRef } from 'react';
import { Candidate, ProblemStatement } from '@/types/recruitment';
import { RECRUITMENT_CATEGORIES } from '@/dispositions/recruitment';

// Component Imports
import Hero from '@/components/recruitment/Hero';
import Roadmap from '@/components/recruitment/Roadmap';
import PositionBoard from '@/components/recruitment/PositionBoard';
import UnlockModal from '@/components/recruitment/UnlockModal';
import ChallengeDetail from '@/components/recruitment/ChallengeDetail';

export default function RecruitmentPage() {
    // State
    const [userProfile, setUserProfile] = useState<Candidate | null>(null);
    const [selectedProblem, setSelectedProblem] = useState<ProblemStatement | null>(null);
    const [showUnlockModal, setShowUnlockModal] = useState(false);

    // Ref to store the problem user tried to click before unlocking
    const pendingProblemRef = useRef<ProblemStatement | null>(null);

    // Handler: Problem Click (Interceptor Logic)
    const handleProblemClick = (problem: ProblemStatement) => {
        if (!userProfile) {
            // User not verified, store pending problem and show modal
            pendingProblemRef.current = problem;
            setShowUnlockModal(true);
        } else {
            // User is verified, navigate to challenge detail
            setSelectedProblem(problem);
        }
    };

    // Handler: Unlock (Form Submission)
    const handleUnlock = (candidateData: Candidate) => {
        // Simulate API call - save candidate data
        setUserProfile(candidateData);

        // Close modal
        setShowUnlockModal(false);

        // Immediately navigate to the pending problem
        if (pendingProblemRef.current) {
            setSelectedProblem(pendingProblemRef.current);
            pendingProblemRef.current = null;
        }
    };

    // Handler: Back from Challenge Detail
    const handleBack = () => {
        setSelectedProblem(null);
    };

    // Handler: Close Modal
    const handleCloseModal = () => {
        setShowUnlockModal(false);
        pendingProblemRef.current = null;
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-black text-slate-300">
            {/* Hero Section */}
            <Hero />

            {/* Roadmap Section */}
            <Roadmap />

            {/* Conditional Render: Challenge Detail OR Position Board */}
            {selectedProblem ? (
                <ChallengeDetail problem={selectedProblem} onBack={handleBack} />
            ) : (
                <PositionBoard
                    categories={RECRUITMENT_CATEGORIES}
                    onSelectProblem={handleProblemClick}
                />
            )}

            {/* Unlock Modal (Interceptor) */}
            <UnlockModal
                isOpen={showUnlockModal}
                onUnlock={handleUnlock}
                onClose={handleCloseModal}
            />
        </div>
    );
}
