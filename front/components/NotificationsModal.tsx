import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const NotificationsModal = ({ isOpen, onClose, notifications, onNotificationClick }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader><DialogTitle>Notifications</DialogTitle></DialogHeader>
                <ScrollArea>
                    {notifications.map((notification) => (
                        <div key={notification.id} className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100" onClick={() => onNotificationClick(notification)}>
                            <p>{notification.message}</p>
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

export default NotificationsModal;