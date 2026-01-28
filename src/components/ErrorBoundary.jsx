import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

const ErrorFallback = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" style={{ direction: 'rtl' }}>
      <div className="text-center p-8">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">حدث خطأ غير متوقع</h1>
        <p className="text-gray-600 mb-6">
          نعتذر، حدث خطأ أثناء تحميل الصفحة
        </p>
        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-6 text-left bg-red-50 p-4 rounded-lg">
            <summary className="cursor-pointer font-semibold text-red-800">تفاصيل الخطأ</summary>
            <pre className="mt-2 text-sm text-red-700 overflow-auto">
              {error?.toString() || 'Unknown error'}
            </pre>
          </details>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="bg-[#1D5E78] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            إعادة تحميل الصفحة
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary
