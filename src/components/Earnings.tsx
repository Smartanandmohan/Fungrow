import { useState } from 'react';
import { 
  DollarSign, 
  ArrowUpRight, 
  Download, 
  Clock, 
  CheckCircle2
} from 'lucide-react';
import type { Transaction } from '../data/mockData';
import Modal from './Modal';

interface EarningsProps {
  transactions: Transaction[];
}

export default function Earnings({ transactions }: EarningsProps) {
  const [downloadingTx, setDownloadingTx] = useState<Transaction | null>(null);

  // Compute metrics
  const totalEarned = transactions
    .filter(t => t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingEarned = transactions
    .filter(t => t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0);

  const completedProjectsCount = transactions.filter(t => t.status === 'Completed').length;

  const handleDownloadInvoice = (tx: Transaction) => {
    setDownloadingTx(tx);
    
    // Generate Invoice HTML template
    const invoiceHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice - ${tx.invoiceId}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;550;700;900&display=swap');
            body { 
              font-family: 'Inter', sans-serif; 
              padding: 50px; 
              color: #1e293b; 
              background-color: #ffffff;
              line-height: 1.5;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              border: 1px solid #e2e8f0;
              padding: 40px;
              border-radius: 20px;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            }
            .header { 
              display: flex; 
              justify-content: space-between; 
              align-items: center;
              border-bottom: 2px solid #6C4DF6; 
              padding-bottom: 25px; 
            }
            .logo { 
              font-size: 28px; 
              font-weight: 900; 
              color: #0f172a; 
              letter-spacing: -0.05em;
            }
            .logo span { color: #6C4DF6; }
            .invoice-details { text-align: right; }
            .invoice-title {
              font-size: 24px;
              font-weight: 900;
              color: #6C4DF6;
              margin: 0;
            }
            .invoice-meta {
              font-size: 13px;
              color: #64748b;
              margin: 4px 0 0 0;
            }
            .billing-section { 
              margin-top: 40px; 
              display: flex;
              justify-content: space-between;
              gap: 40px; 
            }
            .billing-box {
              flex: 1;
            }
            .billing-title { 
              margin: 0 0 10px 0; 
              color: #64748b; 
              font-size: 11px; 
              text-transform: uppercase; 
              font-weight: 700;
              letter-spacing: 0.05em;
            }
            .billing-name {
              font-size: 16px;
              font-weight: 700;
              color: #0f172a;
              margin: 0;
            }
            .billing-desc {
              margin: 4px 0 0 0; 
              font-size: 13px; 
              color: #475569; 
            }
            .table { 
              width: 100%; 
              margin-top: 40px; 
              border-collapse: collapse; 
            }
            .table th { 
              background: #f8fafc; 
              text-align: left; 
              padding: 14px; 
              font-size: 11px; 
              text-transform: uppercase; 
              color: #64748b; 
              font-weight: 700;
              border-bottom: 2px solid #e2e8f0;
            }
            .table td { 
              padding: 16px 14px; 
              border-bottom: 1px solid #f1f5f9; 
              font-size: 14px; 
              color: #334155;
            }
            .total-section { 
              margin-top: 40px; 
              display: flex;
              justify-content: flex-end;
            }
            .total-box {
              text-align: right;
              padding: 10px 20px;
              background-color: #f8fafc;
              border-radius: 12px;
              display: inline-block;
            }
            .total-label {
              font-size: 12px;
              color: #64748b;
              font-weight: 555;
            }
            .total-amount {
              font-size: 22px;
              font-weight: 900;
              color: #6C4DF6;
              margin-top: 4px;
            }
            .footer { 
              margin-top: 60px; 
              text-align: center; 
              font-size: 12px; 
              color: #94a3b8; 
              border-top: 1px solid #f1f5f9; 
              padding-top: 25px; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">funn<span>gro</span></div>
              <div class="invoice-details">
                <h1 class="invoice-title">INVOICE</h1>
                <p class="invoice-meta">Invoice No: <strong>${tx.invoiceId}</strong></p>
                <p class="invoice-meta">Date: <strong>${tx.date}</strong></p>
                <p class="invoice-meta">Status: <strong style="color: ${tx.status === 'Completed' ? '#10b981' : '#f59e0b'};">${tx.status}</strong></p>
              </div>
            </div>
            
            <div class="billing-section">
              <div class="billing-box">
                <h4 class="billing-title">Billed By</h4>
                <h5 class="billing-name">Aryan Sharma</h5>
                <p class="billing-desc">Teen Professional Freelancer</p>
                <p class="billing-desc">Bangalore, India</p>
              </div>
              <div class="billing-box" style="text-align: right;">
                <h4 class="billing-title">Billed To</h4>
                <h5 class="billing-name">${tx.companyName}</h5>
                <p class="billing-desc">Funngro Partner Enterprise</p>
              </div>
            </div>
            
            <table class="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: right; width: 150px;">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Freelance services for project: <strong>"${tx.projectTitle}"</strong></td>
                  <td style="text-align: right; font-weight: 700;">₹${tx.amount.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>
            
            <div class="total-section">
              <div class="total-box">
                <span class="total-label">Total Amount Paid</span>
                <div class="total-amount">₹${tx.amount.toLocaleString('en-IN')}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>Thank you for supporting teen talent and education through real-world gigs!</p>
              <p style="font-size: 10px; margin-top: 10px;">This invoice was generated client-side by the Funngro Teen Portal Revamp prototype.</p>
            </div>
          </div>
          <script>
            // Automatically prompt print dialog when opened
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `;

    // Create file blob and trigger download
    const blob = new Blob([invoiceHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice_${tx.invoiceId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Close loading indicator modal after a short delay
    setTimeout(() => {
      setDownloadingTx(null);
    }, 1500);
  };

  const getStatusBadge = (status: Transaction['status']) => {
    if (status === 'Completed') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-950/50 uppercase tracking-wider">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Completed</span>
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 px-2.5 py-1 rounded-full border border-amber-100 dark:border-amber-950/50 uppercase tracking-wider animate-pulse">
          <Clock className="w-3.5 h-3.5" />
          <span>Pending</span>
        </span>
      );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center justify-between transition-colors duration-300">
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-1">Total Earnings</span>
            <span className="text-3xl font-black text-slate-905 dark:text-white">
              ₹{totalEarned.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-emerald-500 font-semibold flex items-center gap-0.5 mt-1.5 leading-none">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12% this month
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-555 rounded-2xl flex items-center justify-center shadow-sm">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center justify-between transition-colors duration-300">
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-1">Pending Clearance</span>
            <span className="text-3xl font-black text-slate-905 dark:text-white">
              ₹{pendingEarned.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-0.5 mt-1.5 leading-none">
              <Clock className="w-3.5 h-3.5" /> Under review
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/40 text-amber-555 rounded-2xl flex items-center justify-center shadow-sm">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex items-center justify-between transition-colors duration-300">
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-1">Completed Gigs</span>
            <span className="text-3xl font-black text-slate-905 dark:text-white">
              {completedProjectsCount}
            </span>
            <span className="text-xs text-brand font-semibold flex items-center gap-0.5 mt-1.5 leading-none">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% success rate
            </span>
          </div>
          <div className="w-12 h-12 bg-brand-light dark:bg-brand/10 text-brand dark:text-brand-light rounded-2xl flex items-center justify-center shadow-sm">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Transaction Table Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-slate-50 dark:border-slate-850 flex justify-between items-center">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Transactions</h3>
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">Seed ledger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/10">
                <th className="p-4 text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Invoice ID</th>
                <th className="p-4 text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Project / Company</th>
                <th className="p-4 text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="p-4 text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-850">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/20 dark:hover:bg-slate-850/20 transition-colors">
                  <td className="p-4 text-xs font-bold text-slate-900 dark:text-white">
                    {tx.invoiceId}
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {tx.projectTitle}
                    </div>
                    <div className="text-xs text-slate-450 dark:text-slate-500 font-semibold mt-0.5">
                      {tx.companyName}
                    </div>
                  </td>
                  <td className="p-4 text-sm font-black text-slate-905 dark:text-white">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    {tx.date}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(tx.status)}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(tx)}
                      className="inline-flex items-center gap-1.5 h-9 px-3 border border-slate-200 hover:border-brand hover:text-brand dark:border-slate-800 dark:hover:border-brand rounded-lg text-xs font-bold text-slate-655 dark:text-slate-350 transition-colors cursor-pointer"
                      title="Download styled HTML Invoice printout"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Downloading Overlay Modal */}
      <Modal
        isOpen={downloadingTx !== null}
        onClose={() => setDownloadingTx(null)}
      >
        <div className="text-center py-6">
          <div className="w-16 h-16 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Generating Invoice</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mx-auto">
            Compiling billing coordinates for invoice <strong>{downloadingTx?.invoiceId}</strong>. Opening print-ready HTML page.
          </p>
        </div>
      </Modal>

    </div>
  );
}
