import React from 'react';
import { useBooking } from '../context/BookingContext';
import {
  X,
  Smartphone,
  Mail,
  CheckCircle,
  Clock,
  ExternalLink,
  RotateCw,
  Send,
  MessageSquare,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const {
    isNotificationsDrawerOpen,
    closeNotificationsDrawer,
    activeNotificationTab,
    openNotificationsDrawer,
    notifications,
    latestToastNotification,
    dismissToastNotification,
    viewReceipt,
    bookings,
  } = useBooking();

  const smsList = notifications.filter((n) => n.type === 'sms');
  const emailList = notifications.filter((n) => n.type === 'email');

  return (
    <>
      {/* Real-time SMS Toast Banner when a new notification arrives */}
      {latestToastNotification && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-[#16062d] border-2 border-purple-400 rounded-2xl shadow-[0_0_40px_rgba(168,85,247,0.4)] p-4 text-white animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-purple-600/30 border border-purple-400/40 text-purple-300">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">SMS Received</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-400/30">
                    VM-CHNTMN
                  </span>
                </div>
                <div className="text-[11px] text-purple-300 font-mono">
                  To: {latestToastNotification.recipientPhone}
                </div>
              </div>
            </div>
            <button
              onClick={dismissToastNotification}
              className="text-purple-400 hover:text-white p-1 rounded-lg hover:bg-purple-900/40"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2.5 p-2.5 rounded-xl bg-[#0a0114] border border-purple-500/20 text-xs text-purple-200 font-mono leading-relaxed whitespace-pre-line line-clamp-4">
            {latestToastNotification.content}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={() => {
                dismissToastNotification();
                openNotificationsDrawer('sms');
              }}
              className="text-xs font-bold text-purple-300 hover:text-white flex items-center gap-1"
            >
              <span>Open Message Inbox</span>
              <ExternalLink className="w-3 h-3" />
            </button>

            <button
              onClick={dismissToastNotification}
              className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Full Notifications Drawer */}
      {isNotificationsDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg h-full bg-[#0d031a] border-l border-purple-500/40 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-5 border-b border-purple-500/20 bg-[#140529] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Customer Notification Logs
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                    Live Dispatch
                  </span>
                </h3>
                <p className="text-xs text-purple-300/70 mt-0.5">
                  Real-time SMS & Email receipts delivered to registered credentials
                </p>
              </div>
              <button
                onClick={closeNotificationsDrawer}
                className="p-1.5 text-purple-400 hover:text-white rounded-lg hover:bg-purple-900/40 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab switchers */}
            <div className="flex border-b border-purple-500/20 bg-[#090114] p-1">
              <button
                onClick={() => openNotificationsDrawer('sms')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-2 transition-all ${
                  activeNotificationTab === 'sms'
                    ? 'bg-purple-900/60 text-white border border-purple-400/50 shadow'
                    : 'text-purple-400 hover:text-purple-200'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>SMS Messages ({smsList.length})</span>
              </button>

              <button
                onClick={() => openNotificationsDrawer('email')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-2 transition-all ${
                  activeNotificationTab === 'email'
                    ? 'bg-purple-900/60 text-white border border-purple-400/50 shadow'
                    : 'text-purple-400 hover:text-purple-200'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Confirmation Emails ({emailList.length})</span>
              </button>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeNotificationTab === 'sms' ? (
                smsList.length === 0 ? (
                  <div className="text-center py-16 text-purple-300/60 text-xs">
                    <Smartphone className="w-10 h-10 mx-auto text-purple-500/40 mb-3" />
                    <p className="font-semibold text-white">No SMS messages yet</p>
                    <p className="mt-1">Book any package to receive instant mobile SMS confirmation & receipts.</p>
                  </div>
                ) : (
                  smsList.map((sms) => (
                    <div
                      key={sms.id}
                      className="p-4 rounded-2xl bg-[#140529] border border-purple-500/30 shadow-lg space-y-3"
                    >
                      {/* SMS Header */}
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-purple-500/20">
                        <div className="flex items-center space-x-2">
                          <div className="w-7 h-7 rounded-full bg-purple-600/40 border border-purple-400/40 flex items-center justify-center text-purple-200 text-xs font-bold">
                            CS
                          </div>
                          <div>
                            <div className="font-bold text-white">VM-CHNTMN (Chintamani Sound)</div>
                            <div className="text-[10px] text-purple-300 font-mono">
                              To: {sms.recipientPhone}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-purple-400 font-mono">
                          {new Date(sms.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Chat Bubble Message */}
                      <div className="p-3.5 rounded-xl bg-[#090114] border border-purple-500/20 text-xs text-purple-100 font-mono whitespace-pre-line leading-relaxed">
                        {sms.content}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-purple-300">
                        <span className="flex items-center gap-1 text-emerald-400">
                          <CheckCircle className="w-3.5 h-3.5" /> Delivered via Telecom Gateway
                        </span>
                        {sms.bookingId && (
                          <button
                            onClick={() => {
                              const found = bookings.find((b) => b.id === sms.bookingId);
                              if (found) {
                                viewReceipt(found);
                                closeNotificationsDrawer();
                              }
                            }}
                            className="text-purple-300 font-bold hover:underline flex items-center gap-1"
                          >
                            <FileText className="w-3 h-3" /> View Tax Invoice
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )
              ) : emailList.length === 0 ? (
                <div className="text-center py-16 text-purple-300/60 text-xs">
                  <Mail className="w-10 h-10 mx-auto text-purple-500/40 mb-3" />
                  <p className="font-semibold text-white">No emails received yet</p>
                  <p className="mt-1">Book any package to receive full itemized tax invoice & sound schedule via email.</p>
                </div>
              ) : (
                emailList.map((eml) => (
                  <div
                    key={eml.id}
                    className="p-5 rounded-2xl bg-[#140529] border border-purple-500/30 shadow-lg space-y-3.5"
                  >
                    {/* Email Subject Bar */}
                    <div className="space-y-1 pb-3 border-b border-purple-500/20 text-xs">
                      <div className="text-sm font-bold text-white">{eml.subject}</div>
                      <div className="flex items-center justify-between text-purple-300 font-mono text-[11px]">
                        <div>
                          From: <strong>bookings@chintamanisound.in</strong>
                          <br />
                          To: <strong>{eml.recipientEmail}</strong>
                        </div>
                        <div>
                          {new Date(eml.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>

                    {/* Email Body */}
                    <div className="p-4 rounded-xl bg-[#080112] border border-purple-500/20 text-xs text-purple-100 font-mono whitespace-pre-line leading-relaxed max-h-72 overflow-y-auto">
                      {eml.content}
                    </div>

                    {/* Action */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="flex items-center gap-1 text-emerald-400 font-sans">
                        <ShieldCheck className="w-4 h-4" /> DKIM Verified • SSL Signed
                      </span>
                      {eml.bookingId && (
                        <button
                          onClick={() => {
                            const found = bookings.find((b) => b.id === eml.bookingId);
                            if (found) {
                              viewReceipt(found);
                              closeNotificationsDrawer();
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" /> Download Attached Invoice
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
