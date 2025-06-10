
import React, { useState } from 'react';
import Meeting from './Meeting';
import CreateMeetingModal from './CreateMeetingModal';

const Index = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Meeting onCreateMeeting={() => setIsCreateModalOpen(true)} />
            <CreateMeetingModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
};

export default Index;