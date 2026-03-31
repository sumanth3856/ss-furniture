"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { 
  ShoppingCart, 
  Clock, 
  Package, 
  Truck, 
  CheckCircle,
  Search,
  Filter,
  Eye,
  X,
  ChevronDown,
  RefreshCw,
  MoreHorizontal,
  FileText,
  Phone,
  MapPin,
  CreditCard,
  Sparkles
} from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  paymentMethod: string;
}

const mockOrders: Order[] = [
  {
    id: "ORD-2024-001",
    customer: {
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      address: "42, MG Road, Sector 14, Gurugram, Haryana 122001"
    },
    items: [
      { name: "Milano Leather Sofa - 3 Seater", quantity: 1, price: 89999 },
      { name: "Nesting Coffee Table Set", quantity: 1, price: 24999 }
    ],
    total: 114998,
    status: "pending",
    createdAt: "2024-03-15T10:30:00",
    paymentMethod: "UPI"
  },
  {
    id: "ORD-2024-002",
    customer: {
      name: "Rahul Verma",
      email: "rahul.v@email.com",
      phone: "+91 87654 32109",
      address: "15/A, Lake View Apartments, Whitefield, Bangalore 560066"
    },
    items: [
      { name: "Ergonomic Office Chair - Premium", quantity: 2, price: 34999 }
    ],
    total: 69998,
    status: "processing",
    createdAt: "2024-03-14T14:22:00",
    paymentMethod: "Card"
  },
  {
    id: "ORD-2024-003",
    customer: {
      name: "Ananya Patel",
      email: "ananya.p@email.com",
      phone: "+91 76543 21098",
      address: "7th Floor, Sea View Residency, Juhu, Mumbai 400049"
    },
    items: [
      { name: "Walnut Finish King Bed - 6x6", quantity: 1, price: 79999 },
      { name: "Pair of Nightstands", quantity: 2, price: 12999 }
    ],
    total: 105997,
    status: "shipped",
    createdAt: "2024-03-12T09:15:00",
    paymentMethod: "Net Banking"
  },
  {
    id: "ORD-2024-004",
    customer: {
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 65432 10987",
      address: "House No. 23, Green Park Extension, New Delhi 110016"
    },
    items: [
      { name: "Brass Table Lamp - Royal", quantity: 3, price: 4999 }
    ],
    total: 14997,
    status: "delivered",
    createdAt: "2024-03-08T16:45:00",
    paymentMethod: "UPI"
  },
  {
    id: "ORD-2024-005",
    customer: {
      name: "Meera Reddy",
      email: "meera.reddy@email.com",
      phone: "+91 54321 09876",
      address: "Plot 45, Banjara Hills Road No. 12, Hyderabad 500034"
    },
    items: [
      { name: "Modular Wardrobe System", quantity: 1, price: 129999 }
    ],
    total: 129999,
    status: "pending",
    createdAt: "2024-03-15T11:20:00",
    paymentMethod: "EMI"
  }
];

const statusConfig = {
  pending: { 
    label: "Pending", 
    icon: Clock, 
    gradient: "from-amber-400 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50",
    iconBg: "bg-amber-100",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    badge: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30"
  },
  processing: { 
    label: "Processing", 
    icon: Package, 
    gradient: "from-blue-500 to-indigo-500",
    bgGradient: "from-blue-50 to-indigo-50",
    iconBg: "bg-blue-100",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    badge: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30"
  },
  shipped: { 
    label: "Shipped", 
    icon: Truck, 
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-50 to-violet-50",
    iconBg: "bg-purple-100",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    badge: "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/30"
  },
  delivered: { 
    label: "Delivered", 
    icon: CheckCircle, 
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    iconBg: "bg-emerald-100",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    badge: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
  },
  cancelled: { 
    label: "Cancelled", 
    icon: X, 
    gradient: "from-red-500 to-rose-500",
    bgGradient: "from-red-50 to-rose-50",
    iconBg: "bg-red-100",
    textColor: "text-red-700",
    borderColor: "border-red-200",
    badge: "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/30"
  }
};

function StatusBadge({ status }: { status: Order["status"] }) {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${config.badge}`}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}

function StatCard({ label, value, icon: Icon, gradient, delay }: { label: string; value: string | number; icon: LucideIcon; gradient: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all"
    >
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{label}</p>
    </motion.div>
  );
}

export default function AdminOrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => ({
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  });

  const statusCounts = getStatusCounts();
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", { 
      day: "numeric", 
      month: "short", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-900">
            <span className="text-slate-900">Orders</span>
          </h1>
          <p className="text-slate-500 font-medium mt-0.5 sm:mt-1 text-sm">Manage customer orders</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="p-2 sm:p-3 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all border border-slate-200" title="Refresh">
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button className="hidden sm:flex items-center gap-2 px-5 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all">
            <FileText className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard label="Total Orders" value={statusCounts.all} icon={ShoppingCart} gradient="from-purple-500 to-indigo-500" delay={0} />
        <StatCard label="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} icon={Sparkles} gradient="from-amber-500 to-orange-500" delay={0.05} />
        <StatCard label="Delivered" value={statusCounts.delivered} icon={CheckCircle} gradient="from-emerald-500 to-teal-500" delay={0.1} />
        <StatCard label="Pending" value={statusCounts.pending} icon={Clock} gradient="from-amber-500 to-orange-500" delay={0.15} />
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3">
        {[
          { key: "all", label: "All", icon: ShoppingCart, gradient: "from-slate-500 to-slate-600" },
          { key: "pending", label: "Pending", icon: Clock, gradient: "from-amber-500 to-orange-500" },
          { key: "processing", label: "Processing", icon: Package, gradient: "from-blue-500 to-indigo-500" },
          { key: "shipped", label: "Shipped", icon: Truck, gradient: "from-purple-500 to-violet-500" },
          { key: "delivered", label: "Delivered", icon: CheckCircle, gradient: "from-emerald-500 to-teal-500" },
        ].map((status, index) => {
          const Icon = status.icon;
          return (
            <motion.button
              key={status.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setStatusFilter(status.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                statusFilter === status.key 
                  ? `bg-gradient-to-r ${status.gradient} text-white shadow-lg` 
                  : "bg-white text-slate-600 border border-slate-200 hover:border-purple-300 hover:bg-purple-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden xs:inline">{status.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                statusFilter === status.key 
                  ? "bg-white/20" 
                  : "bg-slate-100"
              }`}>
                {statusCounts[status.key as keyof typeof statusCounts]}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by order ID, customer name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-300 outline-none transition-all shadow-sm"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-48 pl-11 pr-10 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-300 outline-none transition-all appearance-none cursor-pointer shadow-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <ShoppingCart className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No orders found</h3>
            <p className="text-slate-500 text-center max-w-sm font-medium">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order, index) => {
                    return (
                      <motion.tr 
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className="hover:bg-slate-50 transition-all"
                      >
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm font-bold text-slate-900">{order.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-700">
                              {order.customer.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{order.customer.name}</p>
                              <p className="text-sm text-slate-500">{order.customer.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-slate-700">{order.items.reduce((sum, i) => sum + i.quantity, 0)} items</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-black text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            ₹{order.total.toLocaleString("en-IN")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-500">{formatDate(order.createdAt)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openOrderDetails(order)}
                              className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 transition-all">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden space-y-3 p-4">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-700 text-lg">
                        {order.customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{order.customer.name}</p>
                        <span className="font-mono text-xs text-slate-500">{order.id}</span>
                      </div>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-3">
                    <span className="text-slate-500">
                      <span className="font-semibold text-slate-700">{order.items.reduce((sum, i) => sum + i.quantity, 0)}</span> items
                    </span>
                    <span className="font-black text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                      ₹{order.total.toLocaleString("en-IN")}
                    </span>
                    <span className="text-slate-400 text-xs">{formatDate(order.createdAt)}</span>
                  </div>

                  <button
                    onClick={() => openOrderDetails(order)}
                    className="w-full py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {showOrderModal && selectedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
              onClick={() => setShowOrderModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden pointer-events-auto border border-slate-200">
                <div className="flex items-center justify-between px-6 lg:px-8 py-5 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Order Details</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">{selectedOrder.id}</p>
                  </div>
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
                  <div className="flex items-center gap-3">
                    <StatusBadge status={selectedOrder.status} />
                    <span className="text-sm text-slate-500">{formatDate(selectedOrder.createdAt)}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{selectedOrder.customer.name.charAt(0)}</span>
                        </div>
                        <h4 className="font-bold text-slate-900">{selectedOrder.customer.name}</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-4 h-4 text-purple-500" />
                          {selectedOrder.customer.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="w-4 text-purple-500 font-bold">@</span>
                          {selectedOrder.customer.email}
                        </div>
                        <div className="flex items-start gap-2 text-sm text-slate-600 pt-2 border-t border-purple-100">
                          <MapPin className="w-4 h-4 text-purple-500 mt-0.5" />
                          <span>{selectedOrder.customer.address}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-bold text-slate-900">Payment</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 font-medium">Method</span>
                          <span className="font-bold text-slate-900 px-3 py-1 bg-amber-100 rounded-lg">{selectedOrder.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-amber-100">
                          <span className="text-slate-600 font-medium">Total</span>
                          <span className="text-2xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            ₹{selectedOrder.total.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                    <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-4">Order Items ({selectedOrder.items.length})</h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                              <Package className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{item.name}</p>
                              <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-black text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                  <div className="flex items-center gap-4 p-6 border-t border-slate-100 bg-slate-50">
                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="flex-1 px-6 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all border border-slate-200"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-6 py-4 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5" />
                    Download Invoice
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
